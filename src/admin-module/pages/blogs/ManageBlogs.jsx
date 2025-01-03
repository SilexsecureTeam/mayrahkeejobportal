import { useContext, useEffect, useState } from "react";
import TableWrap from "../../../admin-exclusive-module/components/TableWrap";
import Trow from "./Trow";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { useNavigate } from "react-router-dom";

const columns = [" ", "Title", "Date Created", "Date Updated", "Feature", "Actions"];

function ManageBlogs() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.user.token);
  const [blogs, setBlogs] = useState([]);
  const navigate=useNavigate();
  const getAllBlogs = async () => {
    try {
      const { data } = await client.get("/blog/posts");
      if (data.data.data) {
        setBlogs([...data.data.data]);
      }
    } catch (error) {
      setBlogs([]);
    }
  };

  const featurePost = async (post, checked) => {
   console.log(post)
    const val = checked ? '1' : '0';

    try {
      const { data } = await client.put(`/blog/posts/${ post.id}`, {feature_post: val});
      if (data.data) {
        await getAllBlogs()
        onSuccess({
          message: 'Blog Update Status',
          success: 'Updated successfully'
        })
        return true;
      }
    } catch (error) {
      onFailure({
        message: 'Blog Update Error',
        error: 'Failed to update'
      })
      return false;
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="py-5 w-full h-full flex flex-col gap-10">
      <div className="w-full bg-green-500 text-white p-4 max-h-[100px] flex justify-between items-center">
        <span className="font-semibold text-lg">Mange Blog Posts</span>
        <span onClick={()=>navigate("/admin/create-blog")} className="cursor-pointer font-semibold text-sm p-2 bg-white text-black rounded-md">Create Blog</span>
      </div>

      <div className="w-full overflow-x-auto">
      <TableWrap rows={columns}>
        {blogs.length !== 0 ? (
          blogs.map((current) => <Trow featurePost={featurePost} data={current} key={current.id} refresh={getAllBlogs} />)
        ) : (
          <span className="text-center w-full flex items-center justify-center">
            No Blogs found
          </span>
        )}
      </TableWrap>
      </div>
    </div>
  );
}

export default ManageBlogs;
