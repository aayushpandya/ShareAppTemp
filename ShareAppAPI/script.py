store=[]
def printStore():
  return store

def clear():
  store.clear()

def save(obj):
  store.append(obj)
  return "Uploaded"

def receiveList(code):
  return [i[0] for i in store if i[1]==code]

def receive(name,code):
  temp = [i for i in store if i[1]==code and i[0]==name]
  print(store)
  print(temp)
  store.remove(temp[0])
  return temp[0]
