function searchItem(item, term) {
  const copyItem = {
    ...item,
  };
  let childrenPassedSearch = false;
  if (item.children && item.children.length > 0) {
    copyItem.children = item.children.map(child => searchItem(child, term));
    childrenPassedSearch = copyItem.children.find(child => child.openedForSearch);
  }

  if (term === '') {
    delete copyItem.openedForSearch;
    return copyItem;
  }

  if (childrenPassedSearch || item.name.indexOf(term) > 0) {
    copyItem.openedForSearch = true;
  } else {
    copyItem.openedForSearch = false;
  }

  return copyItem;
}

export default function searchReducer(data, term) {
  return data.map((item) => searchItem(item, term));
}
