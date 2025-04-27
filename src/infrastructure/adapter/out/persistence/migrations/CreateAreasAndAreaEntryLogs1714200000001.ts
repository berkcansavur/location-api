import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAreasAndAreaEntryLogs1714200000001 implements MigrationInterface {
  name = 'CreateAreasAndAreaEntryLogs1714200000001'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

    await queryRunner.query(`
      CREATE TABLE "areas" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "polygon" geometry(Polygon,4326) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "deletedAt" TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_areas_polygon" ON "areas" USING GIST ("polygon");
    `);

    await queryRunner.query(`
      CREATE TABLE "area_entry_logs" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "areaId" INTEGER NOT NULL,
        "entryTime" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "deletedAt" TIMESTAMP
      );
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_area_entry_logs_areaId" ON "area_entry_logs" ("areaId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_area_entry_logs_areaId"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "area_entry_logs"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_areas_polygon"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "areas"`);
  }
}