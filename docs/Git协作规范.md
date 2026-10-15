# Git 协作规范

给项目小伙伴。每人只在自己的 `product-*` 分支上提交和推送。

仓库：`git@github.com:RenataEcho/BM-PM.git`

| 分支 | 谁用 |
|---|---|
| `main` | 发布用。公开总览从这里出去。同事不改这条分支 |
| `product--CoCo` | CoCo |
| `product-wen` | wen |
| `product-yu` | yu |

下面命令里的 `product-wen` 换成自己的分支名。`product--CoCo` 中间是两条短横线。

同事做的合并只有一个方向：人停在自己的 `product-*` 上，把 `main` 里已经发布的提交拿进自己的分支。`main` 本身不变。把自己的分支合进 `main` 不是同事的操作，命令在文末，给仓库维护人。

先选流程：这台电脑还没有这个仓库，走「首次拉取」。已经克隆过，走「后续更新」。

## 规则

- 不 `git switch main`，不在 `main` 上合并，不执行 `git push origin main`。
- 不往别人的 `product-*` 推。
- 首次拉取只克隆一次。`main` 会一起下来，不要再为它单独拉一遍。
- 后续更新时，人先停在自己的分支上，再把 `main` 的新提交拿进来。
- 一次提交只含这一条需求改过的文件。浏览器下载和本地日志不要加入。
- 提交说明：新需求用 `feat(FR-0xx): 一句话`；只改已有页上一句话用 `fix(FR-0xx): 一句话`；只改总览状态、和某一条需求无关时用 `chore: 一句话`。
- 个人名字写在 `_bmad/custom/config.user.toml`。这个文件不会进仓库。不要改已入库的 `_bmad/config.user.toml` 和 `_bmad/custom/config.toml`。
- 不用 `git push --force`。冲突留在文件里改完再提交，不丢别人的改动。

## 1. 首次拉取

这台电脑还没有仓库时，只做这一节。克隆一次就会把 `main` 和全部 `product-*` 拉到本地。

```bash
git clone git@github.com:RenataEcho/BM-PM.git
cd BM-PM
git switch product-wen
git status
```

`git status` 第一行必须是自己的 `product-*`，工作区是干净的。克隆后默认停在 `main`，先 `git switch` 过去再干活。

不要接着执行 `git pull`，也不要为了「把 `main` 拉下来」再克隆一次。

然后看 `main` 上有没有自己这条分支还没拿到的提交：

```bash
git log --oneline HEAD..origin/main
```

没有输出，首次拉取到这里结束。有输出时，人仍停在自己的分支上，把那些提交拿进来：

```bash
git merge origin/main
```

这一步之后当前分支仍是 `product-wen`，`main` 没有被改。

最后写自己的名字。新建或补全 `_bmad/custom/config.user.toml`：

```toml
[core]
user_name = "自己的名字"
```

输出语言已经由团队配置钉在中文，不用再设。这份文件被忽略，不要提交。

## 2. 后续更新

本地已经有仓库、下次再接着做时，走这一节。人要在自己的分支上，且没有未提交的改动。

```bash
git switch product-wen
git status
git pull
git merge origin/main
```

`git pull` 同步自己这条分支上已经推上去的提交（含另一台电脑）。`git merge origin/main` 把 `main` 上新发布的提交拿进自己的分支。两条都做。做完当前分支仍是 `product-wen`，`main` 没有被改。

有未提交改动时，先提交再更新。不要在脏工作区上合并。`git merge` 提示 `Already up to date` 表示 `main` 上没有新提交，继续干活即可。

## 3. 提交

确认页面没问题后再提交。做完的标准见 `docs/需求输出规范.md` 第 9 节。

```bash
git status
git diff
```

`git status` 第一行仍是自己的 `product-*`。只加入这一条需求改过的文件。看到 `_bmad/config.user.toml` 被改过时，先还原，不要加入：

```bash
git restore _bmad/config.user.toml
```

```bash
git add 这一条需求改过的文件
git commit -m "feat(FR-0xx): 一句话"
```

## 4. 推送到自己的分支

本次还没做过第 2 节时，先做第 2 节，再推。推送写明远程分支名，避免推到 `main`。

```bash
git status
git push origin product-wen
```

`git status` 第一行如果是 `main`，停，不要推。

## 5. 合并冲突

冲突只会发生在自己的分支上：`main` 的内容和自己的提交撞在一起。打开标出的文件，保留双方要留的内容，删掉冲突标记。然后：

```bash
git add 冲突已经改完的文件
git status
git commit
git push origin product-wen
```

没有冲突标记、当前分支仍是自己的 `product-*`，再推。合不上时先不要推，把冲突文件发给助手一起看。

## 6. 合进 main

这一节不是协作同事的操作。仓库维护人确认某条 `product-*` 可以发布后，在 `main` 上把它合进来。同事到第 5 节为止。

```bash
git switch main
git pull origin main
git merge origin/product-wen
git push origin main
```

`product-wen` 换成要发布的那条分支。冲突在 `main` 上改完，再 `git push origin main`。
