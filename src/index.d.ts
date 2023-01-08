//* PNG Modules
declare module '*.png' {
  const content: string
  export default content
}
declare module '*.apng' {
  const content: string
  export default content
}

//* JPEG Modules
declare module '*.jpg' {
  const content: string
  export default content
}
declare module '*.jpeg' {
  const content: string
  export default content
}
declare module '*.pjp' {
  const content: string
  export default content
}
declare module '*.jfi' {
  const content: string
  export default content
}
declare module '*.jif' {
  const content: string
  export default content
}
declare module '*.jfif' {
  const content: string
  export default content
}
declare module '*.pjpeg' {
  const content: string
  export default content
}

//* SVG Modules
declare module '*.svg?url' {
  const content: string
  export default content
}
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

//* WEBP Module
declare module '*.webp' {
  const content: string
  export default content
}

//* GIF Module
declare module '*.gif' {
  const content: string
  export default content
}

//* AVIF Module
declare module '*.avif' {
  const content: string
  export default content
}

//* ICO Modules
declare module '*.ico' {
  const content: string
  export default content
}
declare module '*.cur' {
  const content: string
  export default content
}

//* BMP Module
declare module '*.bmp' {
  const content: string
  export default content
}

//* TIFF Modules
declare module '*.tiff' {
  const content: string
  export default content
}
declare module '*.tif' {
  const content: string
  export default content
}

//* Font Modules
declare module '*.woff' {
  const content: string
  export default content
}
declare module '*.woff2' {
  const content: string
  export default content
}
declare module '*.ttf' {
  const content: string
  export default content
}
declare module '*.otf' {
  const content: string
  export default content
}

//* JSON5 Module
declare module '*.json5' {
  const content: any
  export default content
}

//* CSV Modules
declare module '*.csv' {
  const content: string[][]
  export default content
}
declare module '*.tsv' {
  const content: string[][]
  export default content
}

//* XML Module
declare type XMLContent = { [key: string]: XMLContent | string[] }
declare module '*.xml' {
  const content: { [key: string]: XMLContent | string }
  export default content
}

declare type Only<T, U> = { [P in keyof T]: T[P] } & { [P in keyof U]?: never }
declare type Either<T, U> = Only<T, U> | Only<U, T>
