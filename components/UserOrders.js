"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "@/app/lib/formatDate";
import Image from "next/image";
import formatMoney from "@/app/lib/formatMoney";
import LoadingSpiner from "./LoadingSpiner";
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const StyledOrderBox = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
`;
const BoxOrderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0.5rem;
    gap: 0.25rem;
  }
  h4 {
    font-size: 12px;
  }
  p {
    font-size: 10px;
  }
`;
const StyledFlex = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 860px) {
    flex-direction: column;
    margin: 0.5rem;
    gap: 0.25rem;
  }
`;
const UserOrderListStyles = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid #333;
  padding: 5px;
`;
const StyledBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
const StyledDeliverBox = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  h5 {
    margin: 5px 0;
    font-size: 1.1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const StyledOrderStatus = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  div {
    align-self: center;
    color: green;
    width: 30px;
    height: 30px;
    border: 2px solid green;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default function UserOrders({ user }) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (!user) return; // Wait until user is passed

    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`/api/orders?userId=${user}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching UserOrders: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, [user]);

  if (loading || !orders) {
    return (
      <div>
        <LoadingSpiner />{" "}
      </div>
    );
  }
  console.log(orders);

  return (
    <StyledContainer>
      {orders.map((order) => (
        <StyledOrderBox key={order._id}>
          <BoxOrderInfo>
            <h4>Order Number: {order._id}</h4>
            <p>Date of the order: {formatDate(order.createdAt)}</p>
          </BoxOrderInfo>
          <StyledFlex>
            <div>
              {order.lineItems.map((item) => (
                <UserOrderListStyles key={item._id}>
                  <Image
                    width={100}
                    height={75}
                    src={item.image}
                    alt={item.name}
                  />
                  <StyledBoxInfo>
                    <span>{item.name}</span>
                    <div>
                      <span>Size: {item.size}</span>
                      <span>Qunatity: {item.quantity}</span>
                      <span>Price: {formatMoney(item.price)}</span>
                    </div>
                  </StyledBoxInfo>
                </UserOrderListStyles>
              ))}
            </div>
            <StyledDeliverBox>
              <h5>Deliver information</h5>
              <div>
                <span>Country: {order.country}</span>
                <span>
                  City: {order.city}, {order.postalCode}
                </span>
                <span>Adress: {order.streetAddress}</span>
              </div>
            </StyledDeliverBox>
            <StyledDeliverBox>
              <h5>Client information</h5>
              <div>
                <span>{order.name}</span>
                <span>Email: {order.email}</span>
              </div>
              <StyledOrderStatus>
                <span>
                  Order status:
                  {order.paid ? <span> Paid</span> : <span> Unpaid</span>}
                </span>
                <div>{order.paid ? <span>✔</span> : <span>&times;</span>}</div>
              </StyledOrderStatus>
            </StyledDeliverBox>
          </StyledFlex>
        </StyledOrderBox>
      ))}
    </StyledContainer>
  );
}
