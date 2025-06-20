# main.py

from playbook.playbook import run_playbook
import datetime

if __name__ == "__main__":
    print(f"[{datetime.datetime.now()}] Running Obi-Watch-Kenobi playbook...")
    run_playbook()
    print(f"[{datetime.datetime.now()}] Playbook execution complete.")
