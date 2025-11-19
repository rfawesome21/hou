import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_about_section_margin_top" ADD VALUE 'medium' BEFORE 'default';
  ALTER TYPE "public"."enum__pages_v_blocks_about_section_margin_top" ADD VALUE 'medium' BEFORE 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "margin_top" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "margin_top" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_about_section_margin_top";
  CREATE TYPE "public"."enum_pages_blocks_about_section_margin_top" AS ENUM('none', 'small', 'default', 'large');
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "margin_top" SET DEFAULT 'default'::"public"."enum_pages_blocks_about_section_margin_top";
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "margin_top" SET DATA TYPE "public"."enum_pages_blocks_about_section_margin_top" USING "margin_top"::"public"."enum_pages_blocks_about_section_margin_top";
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "margin_top" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "margin_top" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_about_section_margin_top";
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_margin_top" AS ENUM('none', 'small', 'default', 'large');
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "margin_top" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_about_section_margin_top";
  ALTER TABLE "_pages_v_blocks_about_section" ALTER COLUMN "margin_top" SET DATA TYPE "public"."enum__pages_v_blocks_about_section_margin_top" USING "margin_top"::"public"."enum__pages_v_blocks_about_section_margin_top";`)
}
