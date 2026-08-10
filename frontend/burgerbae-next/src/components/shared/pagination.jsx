import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function CPagination({ currentPage, setCurrentPage, totalPages }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              console.log(currentPage);
              currentPage > 1 && setCurrentPage(currentPage - 1);
            }}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink  isActive={currentPage === index + 1}
              className= {`
    relative px-3 py-2 text-sm text-black

  before:left-0
  before:-bottom-[2px]
  before:h-[2px]
  before:w-full

 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current
                   after:scale-x-0 after:origin-left
                   after:transition-transform after:duration-300
                    hover:after:scale-x-100
 ${currentPage === index + 1 ? "underline font-bold" : "font-normal"}
  `}
        
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
