import { Store } from 'vuex';
import { initialiseStores } from '@client/utils/storeAccessor';

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];

export * from '@client/utils/storeAccessor';
