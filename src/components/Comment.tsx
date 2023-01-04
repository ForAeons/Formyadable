import React from "react";

const Comment: React.FC = () => {
  return (
    <div className="flex flex-col mx-3">
      {/* <!-- title section --> */}
      <div className="justify-left flex flex-row items-center gap-4 px-6 py-3">
        <div className="rounded-full bg-slate-300 shadow-md p-4"></div>
      </div>
      <div className="flex min-h-[20%] min-w-[40%] flex-col justify-start gap-3 rounded-2xl bg-slate-50 p-6 shadow-md hover:shadow-xl">
        {/* <!-- Body --> */}
        <div className="w-f font-sans text-lg text-slate-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit modi
          qui id deserunt perferendis repellat obcaecati vero dolorem optio
          quasi inventore ipsam necessitatibus, placeat dolore? Ea magni fuga
          sapiente ex! Accusantium temporibus suscipit nostrum quia placeat
          impedit error, amet praesentium inventore, possimus aspernatur ratione
          doloremque maiores voluptatum laboriosam. Totam in, molestiae dolore
          id repudiandae rem tenetur rerum recusandae accusantium officia.
        </div>
        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-300" />
        {/* <!-- utilities --> */}
        <div className="flex flex-row justify-between">
          <button className="rounded-md bg-red-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-red-300">
            Like
          </button>
          <button className="rounded-md bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-slate-300">
            Edit
          </button>
        </div>
      </div>

      {/* <!-- Post status --> */}
      <div className="w-f flex flex-row flex-nowrap items-center justify-between px-6 py-3">
        <h4 className="font-sans text-xs text-slate-500">
          Commented 1 day ago
        </h4>
        <h4 className="font-sans text-xs text-slate-500">Edited 2 hours ago</h4>
      </div>
    </div>
  );
};

export default Comment;
