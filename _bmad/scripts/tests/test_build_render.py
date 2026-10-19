"""Regression checks for BMM/GDS coexistence in the installed build workflow."""

import sys
import tempfile
import unittest
from pathlib import Path

sys.dont_write_bytecode = True
PROJECT_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PROJECT_ROOT / "_bmad" / "scripts"))

from render_skill import RenderError, _resolve_short_config, render


class BuildRenderTests(unittest.TestCase):
    def test_build_uses_bmm_paths_with_both_modules_installed(self):
        for gds_path in ("software", "games"):
            with self.subTest(gds_path=gds_path), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                (root / "_bmad").mkdir()
                (root / "_bmad" / "config.toml").write_text(
                    '[core]\ncommunication_language = "Chinese"\n'
                    'document_output_language = "Chinese"\n'
                    '[modules.bmm]\n'
                    'planning_artifacts = "{project-root}/software/planning"\n'
                    'implementation_artifacts = "{project-root}/software/implementation"\n'
                    '[modules.gds]\n'
                    f'planning_artifacts = "{{project-root}}/{gds_path}/planning"\n'
                    f'implementation_artifacts = "{{project-root}}/{gds_path}/implementation"\n',
                    encoding="utf-8",
                )
                entry = render(root, PROJECT_ROOT / ".agents" / "skills" / "bmad-build")
                self.assertTrue(entry.is_file())
                outputs = list(entry.parent.rglob("*.md"))
                self.assertGreater(len(outputs), 7)
                for output in outputs:
                    text = output.read_text(encoding="utf-8")
                    self.assertNotIn("{{config.", text)
                    self.assertNotIn("{{.", text)
                    self.assertNotIn(str(root / "games"), text)
                clarify = (entry.parent / "step-01-clarify-and-route.md").read_text(
                    encoding="utf-8"
                )
                self.assertIn(str(root) + "/software/planning", clarify)
                self.assertIn(str(root) + "/software/implementation", clarify)
                self.assertEqual(render(root, PROJECT_ROOT / ".agents" / "skills" / "bmad-build"), entry)

    def test_ambiguous_short_reference_still_fails(self):
        config = {"modules": {"bmm": {"output": "software"}, "gds": {"output": "games"}}}
        with self.assertRaisesRegex(RenderError, "ambiguous config value"):
            _resolve_short_config(config, "output", PROJECT_ROOT)


if __name__ == "__main__":
    unittest.main()
