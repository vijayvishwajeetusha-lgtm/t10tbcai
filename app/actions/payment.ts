"use server"

export async function getRazorpayConfig() {
  return {
    keyId: process.env.rzp_live_S2vpPVUfNSA022 || "rzp_test_demo_key",
  }
}
