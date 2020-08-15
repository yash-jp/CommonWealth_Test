<!-- Please add further comments, questions, and improvements in this file -->
<!-- Hi My name is Yash Parekh and I thourgly enjoyed working on this test. Mainly I faced two challenges (1) it was built using typescript, which I had to learn as I do not had much exposure about it (2)to get into somebodys code and then take on further from there (3)balancing my full time work and allocating time to this, however I'm glad to say that I enjoyed, learned and able to complete it.
Additionally, I'm very much Thankful to Ben Carpenter for his constant support and co-operativeness.

I tried to understand the whole architecture, which was built in fairly good manner. Then to handle asynchronous call I have used approach of redux-thunk. Where I will call any synchronous action from component and further as redux-thunk gives us capability to dispatch action within action, I'm calling asynchronous action (for DELET and EDIT) from there.

Another twp thing to note is as  (1) Endpoints are fake, it will going to fail, so inside catch I have treated as success, and inside then I have treated as failure and taken corresponding steps.
(2)When we run the application for first time, or refresh the application we are not fetching data from server, however when it runs first time (refresh or first run) we are hydrating the store with the values inside the store.json file. So store will have all those values.



I have tried to make proper commenting wherever possible, messaging  and promptsto user, why I have used certain thing in certain way. I'm eager to discuss how I have gone through this entire process and for the further discussion.

Hope this helps. -->