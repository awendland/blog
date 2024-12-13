---
layout: post
visibility: public
title: "Postgres: dynamic triggers for keeping updated_at"
date: 2023-01-19T21:23:13.278Z
---
```
CREATE OR REPLACE FUNCTION public.set_updated_at_now ()
    RETURNS TRIGGER
    AS $body$
DECLARE
    _q_txt text;
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$body$
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = pg_catalog, public;

CREATE OR REPLACE FUNCTION public.track_updated_at (target_table regclass)
    RETURNS void
    AS $body$
DECLARE
    _q_txt text;
BEGIN
    EXECUTE 'drop trigger if exists track_updated_at on ' || target_table;
    _q_txt = 'create trigger track_updated_at before update on ' || target_table || ' for each row execute procedure public.set_updated_at_now();';
    RAISE NOTICE '%', _q_txt;
    EXECUTE _q_txt;
END;
$body$
LANGUAGE 'plpgsql';

COMMENT ON FUNCTION public.track_updated_at (regclass) IS $body$
Set an automated trigger to set updated_at whenever UPDATE is called on a row in target_table.

Arguments:
   target_table:     Table name, schema qualified if not on search_path
$body$;
```

Then use with

```
SELECT
    track_updated_at ('api_keys');
```