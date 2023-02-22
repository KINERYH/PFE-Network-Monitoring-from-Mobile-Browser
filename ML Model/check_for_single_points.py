pc_data_file = "1189fa8f-02c4-4054-bd5b-59e3689e3cb3_GT.csv"
mobile_data_file = "36ebc322-43db-48a6-8987-37061d99bfb4_GT.csv"
p = "a0abf7f8-6d92-48d5-8ec3-2ee4488c358c_GT.csv"

with open(p, "r") as file:
    lines = file.readlines()
    line1 = lines.pop(0)

    count_dict = {}
    for element in set(lines):
        count_dict[element] = lines.count(element)
    print(count_dict)

    keys_with_value = [key for key, value in count_dict.items() if value < 2]
    print(keys_with_value)

    for value in keys_with_value:
        print("--------------------")
        print(value.strip() + ": " + str(count_dict[value]))
        all_occurrences = [index for index, item in enumerate(lines) if item == value]
        print(all_occurrences)
        print("--------------------")

