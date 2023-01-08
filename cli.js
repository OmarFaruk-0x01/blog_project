const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const componentPath = args[0];
const componentName = args[1];
const ComponentPath = path.join(componentPath, componentName);
const defaultComponentContent = `
import type { FC } from 'react';
import type {${componentName}Props} from './${componentName}.interface'

const ${componentName}: FC<${componentName}Props> = () => {


    return (
        <div>${componentName}</div>
    );
}


export default ${componentName};
`;

if (!fs.existsSync(ComponentPath)) {
  fs.mkdirSync(ComponentPath);
  fs.writeFileSync(
    path.join(ComponentPath, "index.ts"),
    `export {default} from "./${componentName}"`
  );
  fs.writeFileSync(
    path.join(ComponentPath, `${componentName}.interface.ts`),
    `export type ${componentName}Props = {};`
  );
  fs.writeFileSync(
    path.join(ComponentPath, componentName + ".tsx"),
    defaultComponentContent
  );
} else {
  console.log("Component is Exists");
}
