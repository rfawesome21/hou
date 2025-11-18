import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_section_left_width" AS ENUM('w-1/4', 'w-[30%]', 'w-1/3', 'w-[40%]', 'w-[45%]', 'w-1/2');
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_left_width" AS ENUM('w-1/4', 'w-[30%]', 'w-1/3', 'w-[40%]', 'w-[45%]', 'w-1/2');
  ALTER TABLE "posts_rels" ALTER COLUMN "sizes_id" SET DATA TYPE integer;
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "sizes_id" SET DATA TYPE integer;
  ALTER TABLE "sizes" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "sizes_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "left_width" "enum_pages_blocks_about_section_left_width" DEFAULT 'w-1/4';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "left_width" "enum__pages_v_blocks_about_section_left_width" DEFAULT 'w-1/4';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_rels" ALTER COLUMN "sizes_id" SET DATA TYPE varchar;
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "sizes_id" SET DATA TYPE varchar;
  ALTER TABLE "sizes" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "sizes_id" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "left_width";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "left_width";
  DROP TYPE "public"."enum_pages_blocks_about_section_left_width";
  DROP TYPE "public"."enum__pages_v_blocks_about_section_left_width";`)
}
