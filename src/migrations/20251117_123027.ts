import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_rels" ALTER COLUMN "sizes_id" SET DATA TYPE integer;
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "sizes_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "sizes_id" SET DATA TYPE integer;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_rels" ALTER COLUMN "sizes_id" SET DATA TYPE varchar;
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "sizes_id" SET DATA TYPE varchar;
  ALTER TABLE "sizes" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "sizes_id" SET DATA TYPE varchar;`)
}
