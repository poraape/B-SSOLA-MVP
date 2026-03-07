export interface ModelMeta {
  version: string
  releasedAt: string
  school: string
  maintainer: string
  changelog: string[]
}

export const modelMeta: ModelMeta = {
  version: '1.0.0',
  releasedAt: '2026-02-26',
  school: 'EE Ermelino Matarazzo',
  maintainer: 'Projeto Bússola AIS',
  changelog: [
    'Versão inicial estruturada com Gateway Universal de Risco',
    'Implementação de Motor Decisório Premium',
    'Logger institucional anônimo'
  ]
}
