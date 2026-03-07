import mapTilesConfig from '../../data/v2/map-tiles.json';
import { getValidatedModel } from '../../domain/model/loadModel';

import type { ContentBootstrapPayload } from '../contracts/contentBootstrap';

export function executeContentBootstrap(): ContentBootstrapPayload {
  const model = getValidatedModel();

  return {
    model: {
      version: model.version,
      meta: model.meta,
      uiConfig: model.uiConfig,
      searchConfig: model.searchConfig,
      institution: {
        name: model.institution.name,
      },
    },
    network: {
      tileUrl: mapTilesConfig.tileUrl,
      attributionHtml: mapTilesConfig.attributionHtml,
    },
  };
}
