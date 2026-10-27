"""本地 Demo 预览及 FR 规则编辑。仅监听本机。"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import os
import tempfile

ROOT = Path(__file__).resolve().parents[1]
RULES = ROOT / '_bmad-output/mentor/fr-coco-002-导师迭代V1.2/frontend-rules.json'
ENDPOINT = '/__local/mentor-rules'
ROUTES = {ENDPOINT: (RULES, ('user', 'mentor')), '/__local/ai-rules': (ROOT / '_bmad-output/youbao/fr-coco-001-AI申词/frontend-rules.json', ('home', 'records'))}

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / 'demo/iteration'), **kwargs)

    def reply(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def local_request(self):
        return self.headers.get('Host') in ('127.0.0.1:19889', 'localhost:19889') and self.headers.get('Sec-Fetch-Site', 'same-origin') in ('same-origin', 'none')

    def do_GET(self):
        if self.path not in ROUTES:
            return super().do_GET()
        if not self.local_request():
            return self.reply(403, {'error': '仅允许本机预览访问'})
        self.reply(200, json.loads(ROUTES[self.path][0].read_text()))

    def do_POST(self):
        if self.path not in ROUTES or not self.local_request() or self.headers.get('Origin') not in ('http://127.0.0.1:19889', 'http://localhost:19889'):
            return self.reply(403, {'error': '不允许此保存请求'})
        rules, views = ROUTES[self.path]
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= 100000:
                raise ValueError('规则内容过大或为空')
            payload = json.loads(self.rfile.read(size))
            view, groups = payload['view'], payload['groups']
            if view not in views or not isinstance(groups, list) or not 1 <= len(groups) <= 30:
                raise ValueError('规则格式不正确')
            for group in groups:
                if not isinstance(group, list) or len(group) != 2 or not isinstance(group[0], str) or not group[0].strip() or not isinstance(group[1], list) or not group[1]:
                    raise ValueError('每个分区需要标题和规则条目')
                if any(not isinstance(line, str) or not line.strip() for line in group[1]):
                    raise ValueError('规则条目不能为空')
            data = json.loads(rules.read_text())
            if payload.get('base') != data[view]:
                return self.reply(409, {'error': '规则已被其他页面修改，请刷新后再编辑；当前输入仍保留'})
            data[view] = groups
            with tempfile.NamedTemporaryFile('w', dir=rules.parent, delete=False) as target:
                json.dump(data, target, ensure_ascii=False, indent=2)
                target.write('\n')
                temp_path = target.name
            os.replace(temp_path, rules)
            self.reply(200, {'ok': True})
        except (ValueError, KeyError, TypeError, json.JSONDecodeError) as error:
            self.reply(400, {'error': str(error)})

if __name__ == '__main__':
    print('预览：http://127.0.0.1:19889/framework-shell.html', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 19889), Handler).serve_forever()
