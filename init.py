import os
import subprocess
import platform

os.system("cd solarapp-project; npm i")
os.system("cd solarbackend; cargo update")

pwd = subprocess.check_output(["pwd"]).decode("utf-8")
comandos = [
    "/solarapp-project; npm run dev",
    "/solarbackend; cargo run",
]

try:
    node_test = subprocess.check_output(["node --version"], shell=True)
    print(node_test)
except Exception as error:
    print(error)
    print("Precisa do Node instalado")
    exit(1)

try:
    cargo_test = subprocess.check_output(["cargo --version"], shell=True)
    print(cargo_test)
except Exception as error:
    print(error)
    print("Precisa do Cargo/Rust instalado")
    exit(1)

system_data = platform.system()

if system_data == "Windows":
    for cmd in comandos:
        processo = os.system(f"powershell -Command cd {pwd}{cmd}".replace("\n", ""))
elif system_data == "Linux":
    for cmd in comandos:
        processo = os.system(f"cd {pwd}{cmd}".replace("\n", ""))
elif system_data == "Darwin":
    for cmd in comandos:
        processo = os.system(
            f'osascript -e \'tell app "Terminal" to do script "cd {pwd}{cmd}"\''.replace(
                "\n", ""
            )
        )
else:
    print("Sistema não reconhecido. Recomendável iniciar manualmente.")
    exit(1)
