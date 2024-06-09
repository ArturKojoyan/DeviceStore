import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import {
  getLimit,
  getPage,
  getTotalCount,
  setPage,
} from "../store/slices/deviceSlice";

const Pages: FC = () => {
  const pages: number[] = [];
  const currentPage = useSelector(getPage);
  console.log("🚀 ~ currentPage:", currentPage);
  const limit = useSelector(getLimit);
  const totalCount = useSelector(getTotalCount);
  const pageCount = Math.ceil(totalCount / limit);
  const dispatch = useDispatch();

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-3">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => dispatch(setPage(page))}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Pages;
