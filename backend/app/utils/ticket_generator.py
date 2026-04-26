import random
import string
from datetime import datetime

def generate_ticket_id() -> str:
    date_str = datetime.utcnow().strftime("%Y%m%d")
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"GH-{date_str}-{random_part}"
