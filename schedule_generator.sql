WITH kegiatan_list AS (
    SELECT kegiatan.id AS id_kegiatan
         , *
    FROM kegiatan
             LEFT JOIN pola_perulangan pp on kegiatan.id = pp.kegiatan_id
)

   , schedule AS (
    SELECT generate_series(
            tanggal_mulai::timestamp,
            CASE
                WHEN berulang = TRUE
                    THEN tanggal_selesai::timestamp
                ELSE tanggal_mulai::timestamp
                END,
            '1 day') AS date
         , *
    from (
             SELECT kegiatan.id AS id_kegiatan,
                    *
             FROM kegiatan
                      LEFT JOIN pola_perulangan pp on kegiatan.id = pp.kegiatan_id
         ) kegiatan_list
)

   , scheduled_events AS (SELECT extract(isodow FROM date)                         AS day_of_week
                               , extract(day FROM date)                            AS day_of_month
                               , extract(month FROM date)                          AS month_of_year
                               , week_of_month(date::date, 1)                      AS week_of_month
                               , tsrange(date + waktu_mulai, date + waktu_selesai) AS rentang_waktu
                               , *
                          FROM schedule
)

   , prefiltered_events AS (
    SELECT (row_number() OVER (PARTITION BY
        id_kegiatan ORDER BY date) - 1) % interval_perulangan = 0 AS included
         , *
    FROM scheduled_events
    WHERE TRUE
      AND CASE WHEN hari_dalam_minggu IS NULL THEN TRUE ELSE hari_dalam_minggu = day_of_week END
      AND CASE WHEN minggu_dalam_bulan IS NULL THEN TRUE ELSE minggu_dalam_bulan = week_of_month END
      AND CASE WHEN hari_dalam_bulan IS NULL THEN TRUE ELSE hari_dalam_bulan = day_of_month END
      AND CASE WHEN bulan_dalam_tahun IS NULL THEN TRUE ELSE bulan_dalam_tahun = month_of_year END
)

SELECT to_char(date, 'Day, DD Month YYYY')
     , rentang_waktu
     , mk.nama AS nama_mata_kuliah
     , tipe    AS tipe_kelas_mata_kuliah
     , ps.nama AS nama_program_studi
     , ts.nama AS nama_tipe_semester
     , r.nama  AS nama_ruangan
FROM prefiltered_events
         LEFT JOIN pola_perulangan pp ON prefiltered_events.kegiatan_id = pp.kegiatan_id
         LEFT JOIN kelas_mata_kuliah kmk ON kelas_mata_kuliah_id = kmk.id
         LEFT JOIN program_studi ps ON kmk.program_studi_id = ps.id
         LEFT JOIN mata_kuliah mk on kmk.mata_kuliah_id = mk.id
         LEFT JOIN ruangan r on ruangan_id = r.id
         LEFT JOIN tipe_semester ts on kmk.tipe_semester_id = ts.id
WHERE included
  AND ps.nama = 'INFORMATIKA'
  AND ts.nama = 'GASAL'
ORDER BY rentang_waktu