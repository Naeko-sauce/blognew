---
layout: ../../layouts/MarkdownPostLayout.astro
title: "修复标签页面中的 Cannot read properties of undefined (reading 'includes') 错误"
description: "详细分析并解决 Astro 博客中标签页面出现的 'Cannot read properties of undefined (reading 'includes')' 错误"
pubDate: 2023-11-14
author: "naiko"
alt: "标签页面 includes 错误修复"
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: '标签页面错误修复示意图'

tags: ["astro", "前端开发", "错误修复", "javascript"]
---

## 问题现象

在浏览博客的标签页面时，出现了以下错误信息：

```
Cannot read properties of undefined (reading 'includes')
  Stack trace:
    at D:\learn\blognew\blognai\src\pages\tags\[tag].astro:11:80
    at D:\learn\blognew\blognai\src\pages\tags\[tag].astro:11:36
    at Module.getStaticPaths (D:\learn\blognew\blognai\src\pages\tags\[tag].astro:10:22)
```

这个错误导致标签页面无法正常显示，并且出现了 404 或白屏的情况。

## 错误原因分析

让我们来看一下 `[tag].astro` 文件中的关键代码：

```javascript
// 标签页实现详细说明请参考 /guides/tag-page-implementation-guide
export async function getStaticPaths(){
    const allPosts = Object.values(import.meta.glob('../guides/*.md', { eager: true }));
    const uniqueTags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];
    return uniqueTags.map((tag) => {
        const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags.includes(tag));
        return {
            params: { tag },
            props: { posts: filteredPosts },
        };
    });
}
```

错误发生在第 11 行左右：`post.frontmatter.tags.includes(tag)`

**根本原因**：

当尝试获取所有文章的标签时，如果某篇文章的 frontmatter 中没有定义 `tags` 属性，那么 `post.frontmatter.tags` 就是 `undefined`。当代码试图对 `undefined` 调用 `includes()` 方法时，就会抛出 "Cannot read properties of undefined (reading 'includes')" 错误。

## 相关知识点解析

### 1. 什么是 includes() 方法？

`includes()` 是 JavaScript 数组和字符串的一个方法，用于检查数组或字符串是否包含指定的元素或子字符串。例如：

```javascript
const fruits = ['苹果', '香蕉', '橙子'];
console.log(fruits.includes('香蕉')); // 输出: true
console.log(fruits.includes('葡萄')); // 输出: false
```

这个方法只能用于数组或字符串类型的数据。如果尝试对 `undefined` 或 `null` 调用这个方法，就会抛出错误。

### 2. 为什么会出现 undefined？

在这个博客系统中，每篇文章的 frontmatter（文章头部的元数据）可能包含或不包含 `tags` 属性。当我们使用 `import.meta.glob` 读取所有文章时，没有 `tags` 属性的文章，其 `post.frontmatter.tags` 就是 `undefined`。

### 3. 什么是可选链操作符 (?.)？

可选链操作符 `?.` 是 ES2020 引入的一个新特性，用于安全地访问嵌套对象属性。如果属性链中的某个引用是 `null` 或 `undefined`，表达式会短路并返回 `undefined`，而不是抛出错误。

## 修复步骤

我们需要修改 `getStaticPaths` 函数，添加对 `tags` 属性的存在性检查。有两种常见的修复方法：

### 方法一：使用条件判断和可选链操作符

```javascript
export async function getStaticPaths(){
    const allPosts = Object.values(import.meta.glob('../guides/*.md', { eager: true }));
    // 在获取标签前先过滤掉没有tags属性的文章
    const postsWithTags = allPosts.filter((post: any) => post.frontmatter.tags);
    const uniqueTags = [...new Set(postsWithTags.map((post: any) => post.frontmatter.tags).flat())];
    
    return uniqueTags.map((tag) => {
        // 使用可选链操作符和条件判断确保安全访问
        const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags?.includes(tag));
        return {
            params: { tag },
            props: { posts: filteredPosts },
        };
    });
}
```

### 方法二：使用逻辑与运算符 (&&) 进行短路求值

```javascript
export async function getStaticPaths(){
    const allPosts = Object.values(import.meta.glob('../guides/*.md', { eager: true }));
    // 使用map和filter组合处理可能为undefined的tags
    const allTags = allPosts
        .map((post: any) => post.frontmatter.tags)
        .filter(tags => tags !== undefined) // 过滤掉undefined
        .flat();
    const uniqueTags = [...new Set(allTags)];
    
    return uniqueTags.map((tag) => {
        // 使用逻辑与确保只有存在tags属性时才调用includes
        const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags && post.frontmatter.tags.includes(tag));
        return {
            params: { tag },
            props: { posts: filteredPosts },
        };
    });
}
```

## 完整修复代码

我们采用方法二，因为它更直观且兼容性更好：

```javascript
// 标签页实现详细说明请参考 /guides/tag-page-implementation-guide
export async function getStaticPaths(){
    const allPosts = Object.values(import.meta.glob('../guides/*.md', { eager: true }));
    
    // 安全地获取所有文章的标签
    const allTags = allPosts
        .map((post: any) => post.frontmatter.tags)
        .filter(tags => tags !== undefined) // 过滤掉undefined
        .flat();
    const uniqueTags = [...new Set(allTags)];
    
    return uniqueTags.map((tag) => {
        // 安全地过滤包含指定标签的文章
        const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags && post.frontmatter.tags.includes(tag));
        return {
            params: { tag },
            props: { posts: filteredPosts },
        };
    });
}
```

## 代码优化建议

1. **统一使用一种检查方式**：

   注意到在第 18 行也有一个类似的过滤操作：
   ```javascript
   const filteredPosts = posts.filter((posts:any)=> posts.frontmatter.tags && posts.frontmatter.tags.includes(tag));
   ```
   这里已经正确地添加了对 `tags` 属性的存在性检查。为了代码的一致性和可维护性，建议在 `getStaticPaths` 函数中也使用相同的检查方式。

2. **添加类型定义**：

   为了避免类似错误再次发生，可以考虑为文章数据添加 TypeScript 接口定义，明确指出哪些属性是可选的。

   ```typescript
   interface PostFrontmatter {
     title: string;
     description?: string;
     pubDate?: string;
     author?: string;
     tags?: string[]; // 标记为可选属性
     // 其他属性...
   }
   
   interface Post {
     frontmatter: PostFrontmatter;
     url: string;
     // 其他属性...
   }
   ```

## 总结

"Cannot read properties of undefined (reading 'includes')" 错误的主要原因是代码尝试对可能为 `undefined` 的值调用 `includes()` 方法。通过添加简单的条件检查，我们可以安全地处理这种情况，避免错误发生。

在 JavaScript 开发中，处理可能为 `null` 或 `undefined` 的值是常见的挑战。使用条件判断、可选链操作符或空值合并操作符都是有效的解决方案，可以提高代码的健壮性。

## 预防类似错误的方法

1. 始终检查对象属性是否存在，特别是在处理来自外部的数据时
2. 使用 TypeScript 的类型系统来识别潜在的 `null` 或 `undefined` 值
3. 采用防御性编程的思想，预见可能出现的边界情况
4. 编写单元测试来覆盖这些边界情况