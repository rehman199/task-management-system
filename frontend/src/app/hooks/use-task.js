import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import generalApi from "../config/api";
import { errorToast, successToast } from "../config/toast";
import { TasksPath } from "../constants/routes/backend/task-routes";
import { setTasks } from "../store/tasks-slice";
import useLoading from "./use-loading";

const useTask = (initialValues, formType = "fetch") => {
  const [values, setValues] = useState(initialValues);
  const [taskStatusFilter, setTaskStatusFilter] = useState("");

  const { loading, setLoading } = useLoading();
  const { push } = useRouter();

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (formType === "fetch") fetchTasks(taskStatusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStatusFilter]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      task: { ...prev.task, [name]: value },
    }));
  };

  const onSubmit = (event) => {
    setLoading(true);
    event.preventDefault();

    switch (formType) {
      case "create":
        createTask();
        break;
      case "update":
        updateTask();
        break;
      case "delete":
        deleteTask();
        break;
    }

    setLoading(false);
  };

  const fetchTasks = async (filterValue = "") => {
    setLoading(true);
    try {
      const { data } = await generalApi.get(TasksPath, {
        ...(filterValue && { status: filterValue }),
      });
      dispatch(setTasks({ tasks: data.tasks }));
    } catch (err) {
      errorToast(err?.response?.data?.error ?? err.message);
    }
    setLoading(false);
  };

  const createTask = async () => {
    try {
      await generalApi.post(TasksPath, values);
      successToast("Task created successfully");
      push("/");
    } catch (err) {
      errorToast(err?.response?.data?.error ?? err?.message);
    }
  };

  const updateTask = async () => {
    try {
      await generalApi.put(`${TasksPath}/${values.task._id}`, values);
      successToast("Task updated successfully");
      push("/");
    } catch (err) {
      errorToast(err?.response?.data?.error ?? err?.message);
    }
  };

  const deleteTask = async () => {
    try {
      await generalApi.delete(`${TasksPath}/${values.task._id}`);
      successToast("Task deleted successfully");
      fetchTasks(taskStatusFilter);
    } catch (err) {
      errorToast(err?.response?.data?.error ?? err?.message);
    }
  };

  const handleFilterChange = (event) => setTaskStatusFilter(event.target.value);

  return {
    values,
    onChange,
    onSubmit,
    loading,
    useLoading,
    fetchTasks,
    setLoading,
    tasks,
    taskStatusFilter,
    handleFilterChange,
  };
};

export default useTask;
