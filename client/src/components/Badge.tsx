

const Badge = ({ data }: { data: { foodName: string }[] }) => {


    return (
        <div className="flex gap-2 mt-3">
            {
                data.map((val: { foodName: string }, idx: number) => {

                    return (
                        <div className="bg-black text-white px-2 text-center py-[2px] rounded-full" key={idx}>
                            <p className="">{val.foodName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Badge