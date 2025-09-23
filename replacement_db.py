from pocketbase import PocketBase
from dotenv import load_dotenv
import os
load_dotenv()

class ReplacementDB:
    def __init__(self):
        self.pb = PocketBase(os.getenv("POCKETBASE_URL"))
        self.pb.admins.auth_with_password(os.getenv("POCKETBASE_ADMIN_EMAIL"), os.getenv("POCKETBASE_ADMIN_PASSWORD"))
        self.collection = self.pb.collections.get("kvdb")

    def __getitem__(self, key):
        return self.collection.get_first_list_item(f'key="{key}"').value

    def __setitem__(self, key, value):
        # Called when setting an item
        # Example: obj['key'] = 'value'
        self.collection.create({"key": key, "value": value})

    def __delitem__(self, key):
        # Called when deleting an item
        # Example: del obj['key']
        item = self.collection.get_first_list_item(f'key="{key}"')
        if item:
            self.collection.delete(item.id)
        else:
            raise KeyError(key)


    def __contains__(self, key):
        # Called when checking if a key exists
        # Example: 'key' in obj
        res = self.collection.get_first_list_item(f'key="{key}"')
        return res is not None


    def __iter__(self):
        # Called when iterating over the object
        # Example: for key in obj
        all_items = self.collection.get_full_list()
        for item in all_items:
            yield item.key, item.value


    def __len__(self):
        # Called when getting the length of the object
        # Example: len(obj)
        return len(self.collection.get_full_list())

    def __repr__(self):
        # Called when getting the string representation of the object
        # Example: print(obj)
        return f"{self.__class__.__name__}({self.collection.get_full_list()})"