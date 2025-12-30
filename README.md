1. Why did you choose the frontend stack you used?

I chose React with Vite because React provides a component-based structure that makes the UI easier to manage and reuse. Vite offers fast builds and quick development, which helps in creating modern web applications efficiently. Firebase integrates well with React, making authentication and database handling simpler.

2. Explain your Firestore data structure

Firestore uses a single collection called issues, where each issue is stored as a document.

issues
 └─ issueId
      ├─ title
      ├─ description
      ├─ status
      ├─ priority
      ├─ createdBy
      ├─ assignedTo
      └─ createdAt


This structure supports real-time updates and easy filtering by status and priority.

3. Explain how you handled similar issues

Similar logic was handled using reusable React components and shared Firestore queries. Issue creation, listing, and updates are separated into components to keep the code clean and avoid duplication.

4. What was confusing or challenging?

Configuring Firebase with Vite for production and fixing build issues during deployment on Vercel was challenging. Managing real-time updates while maintaining a smooth UI also required careful handling.

5. What would you improve next?

I would improve the UI, add role-based access control, enable comments on issues, and add better validation and testing to make the application more robust.
