import RevisionPersister, {IPersistRevisionCallback} from "documents/RevisionPersister";

class RevisionManager<T> {
  private revisions:T[];
  private currentRevisionNo:number;
  private persister:RevisionPersister<T>;
  
  constructor(onPersistRevision:IPersistRevisionCallback<T>) {
    this.currentRevisionNo = -1;
    this.revisions = [];
    this.persister = new RevisionPersister<T>(onPersistRevision);
  }

  clear() {
    this.currentRevisionNo = -1;
    this.revisions = [];
  }
  
  add(revision:T) {
    const removeFromNo = this.currentRevisionNo + 1;
    if (removeFromNo < this.revisions.length) this.revisions = this.revisions.slice(0, removeFromNo);
    this.revisions.push(revision);
    this.persister.persist(revision);
    ++this.currentRevisionNo;
  }
  
  async waitForPersist():Promise<void> {
    return this.persister.waitForCompletion();
  }
  
  addChanges(changes:any) {
    if (!this.revisions.length) throw Error('Can only add changes after one revision is stored.');
    const nextRevision = {...this.currentRevision} as T;
    let hasChanged = false;
    Object.keys(changes).forEach(key => {
      const currentValue = (nextRevision as any)[key];
      const nextValue = changes[key];
      if (currentValue !== nextValue) {
        (nextRevision as any)[key] = nextValue;
        hasChanged = true;
      }
    });
    if (!hasChanged) {
      console.warn('Changes passed to addChanges() all matched current state. No revision added.');
      return;
    }
    this.add(nextRevision);
  }
  
  prev():T|null {
    if (this.currentRevisionNo <= 0) return null;
    --this.currentRevisionNo;
    return this.revisions[this.currentRevisionNo]
  }
  
  next():T|null {
    if (this.currentRevisionNo >= this.revisions.length - 1) return null;
    ++this.currentRevisionNo;
    return this.revisions[this.currentRevisionNo];
  }
  
  get currentRevision():T|null {
    return this.revisions.length === 0 
      ? null : this.revisions[this.currentRevisionNo];
  }
}

export default RevisionManager;