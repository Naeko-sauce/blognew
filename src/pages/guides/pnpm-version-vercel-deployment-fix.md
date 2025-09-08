---
title: "解决 Vercel 部署中的 pnpm 版本和构建脚本权限问题"
description: "详细分析并解决 Astro 博客在 Vercel 部署时遇到的 pnpm 版本和构建脚本权限警告问题"
pubDate: "2023-11-14"
author: "naiko"
image:
  url: ""
  alt: ""
tags: ["Vercel", "pnpm", "部署问题", "构建配置", "Astro"]
---

## 问题现象

在 Vercel 部署过程中出现了以下警告和提示：

```
Using pnpm@10.x based on project creation date
To use pnpm@9.x, manually opt in using corepack ( `https://vercel.com/docs/deployments/configure-a-build#corepack)`
Installing dependencies...
Lockfile is up to date, resolution step is skipped
Progress: resolved 1, reused 0, downloaded 0, added 0
Packages: +3
+++
Progress: resolved 3, reused 0, downloaded 3, added 3, done
dependencies:
+ @astrojs/rss 4.0.12

╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: esbuild, sharp.                                     │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

Done in 2.1s using pnpm v10.14.0
```

这些警告虽然不会立即导致部署失败，但可能会影响项目的构建过程和依赖的正确安装。

## 错误原因分析

### 1. pnpm 版本问题

错误信息显示："Using pnpm@10.x based on project creation date"。这表明 Vercel 根据项目创建日期自动选择了 pnpm 的版本（这里是 10.x），但可能与项目期望的版本不匹配。

错误还提到："To use pnpm@9.x, manually opt in using corepack"，这提供了一个解决方案提示，但没有详细说明如何操作。

### 2. 构建脚本权限警告

警告信息："Ignored build scripts: esbuild, sharp" 表明 pnpm 在安装依赖时忽略了某些构建脚本。这可能会导致依赖无法正确构建，特别是对于需要编译原生模块的依赖（如 sharp）。

建议："Run 'pnpm approve-builds' to pick which dependencies should be allowed to run scripts"，但在 Vercel 的自动化部署环境中，我们无法直接运行这个命令。

## 相关知识点解析

### 1. 什么是 Corepack？

Corepack 是 Node.js 的一个实验性工具，它允许项目固定使用特定版本的包管理器（如 npm、yarn 或 pnpm）。它的主要作用是确保在不同环境中使用相同版本的包管理器，避免因版本差异导致的构建问题。

在 Vercel 环境中，Corepack 可以帮助我们控制使用的 pnpm 版本，而不是让 Vercel 自动选择。

### 2. 为什么构建脚本会被忽略？

从 pnpm v7 开始，默认情况下会忽略安装过程中的构建脚本（也称为 "postinstall scripts"）。这是出于安全考虑，因为构建脚本可能包含潜在的不安全操作。

对于某些依赖（如 esbuild、sharp 等），构建脚本是必要的，因为它们需要在安装过程中编译原生代码或执行其他必要的设置步骤。

## 修复步骤

### 步骤 1：在 package.json 中指定 pnpm 版本

我们可以通过在 package.json 中添加 `packageManager` 字段来指定项目使用的 pnpm 版本。这样，无论在哪个环境中，都会使用指定的版本。

```json
{
  "name": "blognai",
  "type": "module",
  "version": "0.0.1",
  "packageManager": "pnpm@9.0.0", // 指定 pnpm 版本
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.12",
    "astro": "^5.13.2"
  }
}
```

### 步骤 2：在 Vercel 中启用 Corepack

为了让 Vercel 尊重我们在 package.json 中指定的 pnpm 版本，我们需要在 Vercel 项目设置中启用 Corepack。

操作方法：

1. 登录 Vercel 控制台
2. 进入项目设置
3. 导航到 "Environment Variables" 部分
4. 添加一个新的环境变量：
   - 名称：`ENABLE_EXPERIMENTAL_COREPACK`
   - 值：`1`
5. 保存更改

### 步骤 3：处理构建脚本权限问题

对于构建脚本权限问题，我们有几种解决方案：

#### 方案 A：使用 .npmrc 文件

在项目根目录创建一个 `.npmrc` 文件，并添加以下内容：

```ini
# 允许特定包运行构建脚本
enable-pre-post-scripts=true
# 或者更精细地控制
safe-perm=true
```

这个设置将允许所有包运行构建脚本。如果需要更精细的控制，可以参考 pnpm 文档中关于安全设置的部分。

#### 方案 B：使用 pnpm-workspace.yaml 文件

如果项目已经有 `pnpm-workspace.yaml` 文件（从目录结构看确实有），我们可以在其中添加构建脚本权限设置：

```yaml
# 现有的工作区配置
# ...

# 添加构建脚本权限设置
safe-perm: true
```

#### 方案 C：在 Vercel 构建命令中添加权限设置

另一种方法是在 Vercel 的构建命令中添加临时设置：

1. 登录 Vercel 控制台
2. 进入项目设置
3. 导航到 "Build & Development Settings" 部分
4. 在 "Build Command" 中，将 `astro build` 更改为：
   ```
pnpm config set safe-perm true && astro build
   ```
5. 保存更改

## 完整修复代码

以下是需要修改的文件内容：

### 1. package.json

```json
{
  "name": "blognai",
  "type": "module",
  "version": "0.0.1",
  "packageManager": "pnpm@9.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.12",
    "astro": "^5.13.2"
  }
}
```

### 2. .npmrc（如果不存在则创建）

```ini
# 允许运行构建脚本
enable-pre-post-scripts=true
```

## 代码优化建议

除了上述修复外，以下是一些额外的优化建议：

1. **使用锁定文件确保依赖版本一致**：

   项目已经有 `pnpm-lock.yaml` 文件，这是好的做法。这个文件确保了每次安装都会使用完全相同的依赖版本，避免因依赖版本变化导致的问题。

2. **考虑使用 Vercel 配置文件**：

   可以创建一个 `vercel.json` 文件来更精细地控制 Vercel 的构建行为：

   ```json
   {
     "buildCommand": "astro build",
     "installCommand": "pnpm install",
     "framework": "astro",
     "outputDirectory": "dist"
   }
   ```

3. **添加构建前检查脚本**：

   在 `package.json` 中添加一个预构建脚本，用于检查环境和依赖状态：

   ```json
   "scripts": {
     "dev": "astro dev",
     "build": "astro build",
     "preview": "astro preview",
     "astro": "astro",
     "prebuild": "echo \"Checking environment...\" && pnpm --version"
   }
   ```

## 总结

Vercel 部署中的 pnpm 版本和构建脚本权限问题主要是由于环境配置不匹配导致的。通过以下步骤，我们可以解决这些问题：

1. 在 `package.json` 中使用 `packageManager` 字段指定 pnpm 版本
2. 在 Vercel 中添加 `ENABLE_EXPERIMENTAL_COREPACK` 环境变量启用 Corepack
3. 通过 `.npmrc` 文件或 Vercel 设置允许运行构建脚本

这些设置确保了在 Vercel 环境中使用与开发环境一致的工具和配置，从而避免因环境差异导致的部署问题。

## 预防类似错误的方法

1. 在项目早期就确定并记录使用的工具版本
2. 使用锁定文件（如 pnpm-lock.yaml）确保依赖版本一致
3. 了解部署环境的默认配置和行为
4. 使用配置文件（如 vercel.json、.npmrc 等）明确指定构建和部署行为
5. 在本地模拟部署环境进行测试