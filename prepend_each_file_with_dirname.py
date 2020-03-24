#!/usr/bin/python3

import os
import sys

if (len(sys.argv) < 2):
    print("Error: The first argument needs to be a directory.")
    exit(1)

dir_abs_path = os.path.abspath(sys.argv[1])
dirname = os.path.dirname(sys.argv[1])

if (not os.path.isdir(dir_abs_path)):
    print("Error: {} is not a directory".format(dir_abs_path) )
    exit(1)

for filename in os.listdir(dir_abs_path):
    filename = filename.lower().replace(" ", "_")

    prefix = dirname.lower().replace(" ", "_") + "_"
    abs_old_filename = os.path.join(dir_abs_path, filename)

    if not filename.startswith(prefix):
        abs_new_filename = os.path.join(dir_abs_path, prefix + filename)
        os.rename(abs_old_filename, abs_new_filename)
