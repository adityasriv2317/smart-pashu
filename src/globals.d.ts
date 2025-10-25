// For CSS Modules (*.module.css)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// For regular CSS files (*.css)
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// For SCSS Modules (*.module.scss)
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}