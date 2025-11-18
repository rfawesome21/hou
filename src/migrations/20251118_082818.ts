import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_about_section_left_width" ADD VALUE 'w-3/4';
  ALTER TYPE "public"."enum__pages_v_blocks_about_section_left_width" ADD VALUE 'w-3/4';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "left_width" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "left_width" SET DEFAULT 'w-1/4'::text;
  DROP TYPE "public"."enum_pages_blocks_about_section_left_width";
  CREATE TYPE "public"."enum_pages_blocks_about_section_left_width" AS ENUM('w-1/4', 'w-[30%]', 'w-1/3', 'w-[40%]', 'w-[45%]', 'w-1/2');
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "left_width" SET DEFAULT 'w-1/4'::"public"."enum_pages_blocks_about_section_left_width";
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "left_width" SET DATA TYPE "public"."enum_pages_blocks_about_section_left_width" USING "left_width"::"public"."enum_pages_blocks_about_section_left_width";
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "left_width" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "left_width" SET DEFAULT 'w-1/4'::text;
  DROP TYPE "public"."enum__pages_v_blocks_about_section_left_width";
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_left_width" AS ENUM('w-1/4', 'w-[30%]', 'w-1/3', 'w-[40%]', 'w-[45%]', 'w-1/2');
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "left_width" SET DEFAULT 'w-1/4'::"public"."enum__pages_v_blocks_about_section_left_width";
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "left_width" SET DATA TYPE "public"."enum__pages_v_blocks_about_section_left_width" USING "left_width"::"public"."enum__pages_v_blocks_about_section_left_width";`)
}
