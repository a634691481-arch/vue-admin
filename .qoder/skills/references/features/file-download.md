# 文件下载

提供多种文件下载方式，支持 URL 下载、Base64 下载、Blob 下载和图片 URL 下载。

## 导入方式

```ts
import {
  downloadFileFromBase64,
  downloadFileFromBlob,
  downloadFileFromBlobPart,
  downloadFileFromImageUrl,
  downloadFileFromUrl,
  urlToBase64,
} from '@vben/utils'
```

## 通过 URL 下载文件

```ts
import { downloadFileFromUrl } from '@vben/utils'

// 基础用法
downloadFileFromUrl({
  source: 'https://example.com/file.pdf',
})

// 指定文件名
downloadFileFromUrl({
  source: 'https://example.com/file.pdf',
  fileName: '我的文件.pdf',
})

// 指定打开方式
downloadFileFromUrl({
  source: 'https://example.com/file.pdf',
  target: '_self', // '_blank' | '_self'
})
```

## 通过图片 URL 下载图片

```ts
import { downloadFileFromImageUrl } from '@vben/utils'

// 下载图片并自动转换为 base64 后下载
downloadFileFromImageUrl({
  source: 'https://example.com/image.png',
  fileName: '我的图片.png',
})
```

## 通过 Base64 下载文件

```ts
import { downloadFileFromBase64 } from '@vben/utils'

// 下载 base64 图片
downloadFileFromBase64({
  source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  fileName: 'image.png',
})
```

## 通过 Blob 下载文件

```ts
import { downloadFileFromBlob } from '@vben/utils'

// 下载后端返回的 Blob 数据
downloadFileFromBlob({
  source: blobData,
  fileName: 'report.xlsx',
})
```

## 通过文本/数据下载文件

```ts
import { downloadFileFromBlobPart } from '@vben/utils'

// 下载文本内容
downloadFileFromBlobPart({
  source: '这是文本内容',
  fileName: 'test.txt',
})

// 下载 JSON 数据
const jsonData = JSON.stringify({ name: 'test', value: 123 }, null, 2)
downloadFileFromBlobPart({
  source: jsonData,
  fileName: 'data.json',
})
```

## 配合 API 请求下载

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { Page } from '@vben/common-ui'
  import { downloadFileFromBlob, downloadFileFromUrl } from '@vben/utils'

  import { Button, Card, message } from 'ant-design-vue'

  import { downloadFile1, downloadFile2 } from '#/api/examples/download'

  const downloadResult = ref('')

  // 方式1：后端返回 Blob
  function downloadBlob() {
    downloadFile1().then(res => {
      downloadFileFromBlob({
        source: res,
        fileName: 'report.xlsx',
      })
      message.success('下载成功')
    })
  }

  // 方式2：后端返回 Response（包含 headers 信息）
  function downloadResponse() {
    downloadFile2().then(res => {
      downloadFileFromBlob({
        source: res.data,
        fileName: 'report.xlsx',
      })
      downloadResult.value = `下载成功，headers：${JSON.stringify(res.headers)}`
    })
  }
</script>

<template>
  <Page title="文件下载示例">
    <Card title="后端返回 Blob">
      <Button type="primary" @click="downloadBlob">下载文件</Button>
    </Card>

    <Card title="后端返回 Response">
      <Button type="primary" @click="downloadResponse">下载文件</Button>
      <div class="mt-4">{{ downloadResult }}</div>
    </Card>
  </Page>
</template>
```

## URL 转 Base64

```ts
import { urlToBase64 } from '@vben/utils'

// 将图片 URL 转为 base64
urlToBase64('https://example.com/image.png').then(base64 => {
  console.log(base64) // data:image/png;base64,...
})

// 指定 MIME 类型
urlToBase64('https://example.com/image.jpg', 'image/jpeg').then(base64 => {
  console.log(base64)
})
```

## 完整示例页面

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { Page } from '@vben/common-ui'
  import { downloadFileFromBase64, downloadFileFromBlobPart, downloadFileFromImageUrl, downloadFileFromUrl } from '@vben/utils'

  import { Button, Card } from 'ant-design-vue'

  import imageBase64 from './base64'
</script>

<template>
  <Page title="文件下载示例">
    <Card title="根据文件地址下载文件">
      <Button
        type="primary"
        @click="
          downloadFileFromUrl({
            source: 'https://example.com/file.zip',
            target: '_self',
          })
        "
      >
        下载文件
      </Button>
    </Card>

    <Card title="根据地址下载图片">
      <Button
        type="primary"
        @click="
          downloadFileFromImageUrl({
            source: 'https://example.com/image.png',
            fileName: 'logo.png',
          })
        "
      >
        下载图片
      </Button>
    </Card>

    <Card title="base64 流下载">
      <Button
        type="primary"
        @click="
          downloadFileFromBase64({
            source: imageBase64,
            fileName: 'image.png',
          })
        "
      >
        下载图片
      </Button>
    </Card>

    <Card title="文本下载">
      <Button
        type="primary"
        @click="
          downloadFileFromBlobPart({
            source: 'text content',
            fileName: 'test.txt',
          })
        "
      >
        下载文本
      </Button>
    </Card>
  </Page>
</template>
```

## API 说明

### downloadFileFromUrl

通过 URL 下载文件，支持跨域。

```ts
function downloadFileFromUrl(options: {
  source: string // 文件 URL
  fileName?: string // 自定义文件名
  target?: string // 打开方式，默认 '_blank'
}): Promise<void>
```

### downloadFileFromImageUrl

通过图片 URL 下载图片，内部会将图片转为 base64 后下载。

```ts
function downloadFileFromImageUrl(options: {
  source: string // 图片 URL
  fileName?: string // 自定义文件名
}): Promise<void>
```

### downloadFileFromBase64

通过 Base64 数据下载文件。

```ts
function downloadFileFromBase64(options: {
  source: string // Base64 字符串
  fileName?: string // 自定义文件名
}): void
```

### downloadFileFromBlob

通过 Blob 对象下载文件。

```ts
function downloadFileFromBlob(options: {
  source: Blob // Blob 对象
  fileName?: string // 自定义文件名，默认 'downloaded_file'
}): void
```

### downloadFileFromBlobPart

通过任意数据（字符串、Buffer 等）下载文件，内部自动转为 Blob。

```ts
function downloadFileFromBlobPart(options: {
  source: BlobPart // 任意数据类型
  fileName?: string // 自定义文件名，默认 'downloaded_file'
}): void
```

### urlToBase64

将图片 URL 转为 Base64。

```ts
function urlToBase64(url: string, mineType?: string): Promise<string>
```

## 使用场景

- 导出 Excel/CSV 文件
- 下载 PDF 报告
- 下载用户上传的文件
- 图片保存到本地
- 文本/JSON 数据导出
- 后端返回 Blob 数据的文件下载

## 注意事项

1. `downloadFileFromUrl` 在 iOS 设备上不支持直接下载，会提示错误
2. `downloadFileFromImageUrl` 需要图片允许跨域（CORS），否则可能转换失败
3. `downloadFileFromBlobPart` 自动将非 Blob 数据转为 `application/octet-stream` 类型 Blob
4. 下载完成后会自动清理临时创建的 URL 对象，避免内存泄漏
5. 如果未提供 `fileName`，`downloadFileFromUrl` 会尝试从 URL 路径自动提取文件名
