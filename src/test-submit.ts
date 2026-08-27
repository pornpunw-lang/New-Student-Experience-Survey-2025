import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId
});

const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

async function testSecurity() {
  const testId = `TEST-${Date.now()}`;
  const docRef = doc(db, 'submissions', testId);

  console.log("=== STEP 1: TESTING DOCUMENT CREATION ===");
  try {
    await setDoc(docRef, {
      id: testId,
      submittedAt: new Date().toISOString(),
      studentName: "Test Student",
      faculty: "Engineering",
      major: "Computer Engineering",
      academicYear: "2569"
    });
    console.log("✅ SUCCESS: Creation allowed under security rules.");
  } catch (err: any) {
    console.error("❌ FAILED: Creation blocked:", err.message);
  }

  console.log("\n=== STEP 2: TESTING DOCUMENT DELETION ===");
  try {
    await deleteDoc(docRef);
    console.log("❌ FAILURE: Security rules allowed deletion! (Danger)");
  } catch (err: any) {
    console.log("✅ SUCCESS: Deletion blocked as expected by security rules:", err.message);
  }

  console.log("\n=== STEP 3: CLEANUP / CURRENT COUNT ===");
  try {
    const snap = await getDocs(collection(db, 'submissions'));
    console.log(`Current submissions count in cloud: ${snap.size}`);
  } catch (err: any) {
    console.error("Fetch failed:", err.message);
  }
}

testSecurity();
