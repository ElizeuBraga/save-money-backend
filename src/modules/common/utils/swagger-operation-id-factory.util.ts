export const operationIdFactory = (
  controllerKey: string,
  methodKey: string,
) => {
  let controller = controllerKey.replace(/Controller$/, '')
  controller = controller.charAt(0).toUpperCase() + controller.slice(1)

  const action = methodKey.charAt(0).toUpperCase() + methodKey.slice(1)

  return `${controller}${action}`
}
