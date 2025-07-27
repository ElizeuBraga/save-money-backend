import { DataSource, DataSourceOptions } from 'typeorm'
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional'

export async function dataSourceFactory(
  options: DataSourceOptions | undefined,
): Promise<DataSource> {
  return new Promise((resolve, reject) => {
    if (!options) {
      reject(new Error('Invalid data source options'))
      return
    }

    initializeTransactionalContext({
      storageDriver: StorageDriver.AUTO,
    })

    const dataSource = addTransactionalDataSource(new DataSource(options))
    // patchCustomQueryBuilder(dataSource)

    resolve(dataSource)
  })
}
