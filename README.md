# Merck Temp

## Environments
- Preview: https://main--merck-temp--LucaNerlich.aem.page/
- Live: https://main--merck-temp--LucaNerlich.aem.live/

- Test Page A: https://main--merck-temp--LucaNerlich.aem.page/m5or0nnwfk2
  - Source Page: https://mcgfsysykllg-0nfhjpfj98bbt64.pub.sfmc-content.com/m5or0nnwfk2
- Test Page B: https://main--merck-temp--LucaNerlich.aem.page/5b2hj3bjfil
  - Source Page: https://mcgfsysykllg-0nfhjpfj98bbt64.pub.sfmc-content.com/5b2hj3bjfil

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
