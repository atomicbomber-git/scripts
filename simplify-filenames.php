#!/usr/bin/php

<?php

$directoryRootPath = $argv[1] ?? null;

if (empty($directoryRootPath) || scandir($directoryRootPath) === false) {
    print("The first argument, '{$directoryRootPath}' is not a directory.");
    exit(1);
}

$recursiveDirectoryIterator = new \RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(
        $directoryRootPath,
        RecursiveDirectoryIterator::SKIP_DOTS
    ), \RecursiveIteratorIterator::CHILD_FIRST
);

foreach ($recursiveDirectoryIterator as $file) {
    $fileName = $file->getFileName();

    $newName = str_replace(
        [',', ' '],
        '_',
        strtolower($fileName)
    );

    $pathName = $file->getPathname();
    $newPathName = dirname($pathName) . DIRECTORY_SEPARATOR . $newName;

    rename(
        $pathName,
        $newPathName
    );

    print("Renaming {$pathName} to {$newPathName}\n");
}