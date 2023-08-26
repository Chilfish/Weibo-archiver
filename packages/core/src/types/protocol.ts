export interface Protocol {
  text: string
  reg: RegExp
  parser: (text: string, path: string) => string
}

export type ProtocolMap = Record<string, Protocol>
