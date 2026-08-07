const STORAGE_KEY = "dcf_lab_counter";
const START_VALUE = 949;

export const getCounter = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, START_VALUE.toString());
    return START_VALUE;
  }

  return Number(stored);
};

export const incrementCounter = () => {
  const current = getCounter();
  const updated = current + 1;

  localStorage.setItem(STORAGE_KEY, updated.toString());

  return updated;
};
