import { uid } from "@/utils/index";
let listOrder = 0;

export function createList(title) {
  const result = Object.create(null);
  result.title = title;
  result.id = uid();
  result.order = listOrder;
  result.cards = [];
  result.cardComposing = false;
  
  listOrder++;
  return result
}