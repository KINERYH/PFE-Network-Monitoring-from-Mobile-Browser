import os
import ast
import hashlib

measurements_path = "../TestData"
data_file = "trainingData.txt"
preprocessed_data_file = "trainingDataPreprocessed.txt"


def hash_string_to_int(s):
    hash_value = hashlib.sha1(s.encode()).hexdigest()
    max_int = 2 ** 32 - 1  # The largest integer that can be represented using 32 bits
    prime_mod = 4294967311  # A prime number that is smaller than max_int
    hash_int = int(hash_value, 16) % prime_mod

    return hash_int


def handle_cpu_usage(cpu_usage):
    usage = [list(d['usage'].values()) for d in ast.literal_eval(cpu_usage.replace(" ", ", "))]
    global_usage = [str(sum(single_usage)) for single_usage in zip(*usage)]
    return global_usage


with open(os.path.join(measurements_path, data_file), "r") as file:
    new_file_content = ""
    lines = file.readlines()
    line1 = lines.pop(0)
    for line in lines:
        single_line = line.split(',')[:-2]

        if 'mobile' in data_file.lower():
            single_line[-1] = "0,0,0,0"
            single_line[18] = "0"
            single_line[16] = "0"
        else:
            single_line[-1] = ','.join(handle_cpu_usage(single_line[-1]))

        # single_line[-1] = ["{:.2f}".format(float(c) / (10 ** (len(str(c)) - 1))) for c in single_line[-1].split(',')]
        # single_line[-1] = ','.join(single_line[-1])

        for i, c in enumerate(single_line[:-1]):
            if not c.replace('.', '').isdigit():
                single_line[i] = str(hash_string_to_int(c))
            #     y = x / (10 ** (len(str(x)) - 1))
            #     single_line[i] = "{:.2f}".format(y)
            # else:
            #     y = float(c) / (10 ** (len(str(c)) - 1))
            #     single_line[i] = "{:.2f}".format(y)

        new_file_content = new_file_content + ','.join(single_line) + "\n"

    with open(os.path.join(measurements_path, preprocessed_data_file), "w") as write_file:
        write_file.writelines(new_file_content)
