import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GoogleAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public googleId: string | null | undefined

  @column()
  public name: string | null | undefined

  @column()
  public token: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
