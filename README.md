# Herbs - Fire - Salt

菜谱和食材按季节浏览；每份发布的菜谱对应一篇灵感文章。

Markdown 分别放在 `src/content/recipes/`、`src/content/ingredients/` 和 `src/content/field-notes/`。三类内容都需要 `title`、`description`、`cover`；可选 `order`、`draft`，菜谱和食材还可选 `englishTitle`。

菜谱示例（`inspiration` 是灵感文件名，不含扩展名）：

用 `title` 更新目录里的菜名。分类 `category` 填前菜、主菜、配菜或甜点，选填 `order` 可调整同类菜谱的顺序。

```yaml
---
title: 烤南瓜
description: 一道秋季菜肴。
cover: /images/example.jpg
seasons: [autumn]
category: 主菜
inspiration: pumpkin-story
inspirationSummary: 灵感来自南瓜的故事。
draft: true
---
```

食材填写 `seasons: [spring, summer]`，可跨季节。可用值为 `spring`、`summer`、`autumn`、`winter`。灵感文章使用基础字段即可。草稿不会发布；正式菜谱和灵感必须一一配对，否则构建报错。

开发：`npm run dev -- --background`；查看状态：`npm run astro -- dev status`；停止：`npm run astro -- dev stop`；构建：`npm run build`。
