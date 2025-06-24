# Reflections

This project tested how to use useState so that components could function accurately based on parent propagation. For this project, the useState was positioned on the TaskList component to mananged the other components. The reason behind this was because the TaskList could accept the props from TaskItem so that the data can persist across all the other components. 

However, there were still several challenges encountered. The first issue was that everytime the page loaded, it would load with displaying the task. The cause of the issue was that I initially set the useState to be empty. To resolve this issue, I created a function to check and load a (set of) default task to local storage that could be retrieved when the page is loaded. Then I passed this function as the initial value for the useState so that when the page loaded, it would peer into local storage and see if there was data stored and if not, load the default task.

The next task that was challenging was setting the filter and search functions. Working on this component demonstrated how a spread object can be used to generate objects to create new arrays based on specific criteria. 

