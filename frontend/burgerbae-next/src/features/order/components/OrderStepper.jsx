import React from "react";

const OrderStepper = ({ steps = [], currentStep = 0 }) => {
    const styles = {
  container: {
    padding: "10px 0",
  },

  stepWrapper: {
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
  },

  circle: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    color: "#fff",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },

  lineContainer: {
    position: "relative",
    width: 2,
    height: 60,
  },

  lineBase: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#e5e7eb",
  },

  lineProgress: {
    position: "absolute",
    width: "100%",
    background: "#16a34a",
    top: 0,
    left: 0,
    transition: "height 0.4s ease",
  },

  content: {
    paddingBottom: 25,
  },

  title: {
    fontWeight: "600",
    fontSize: "14px",
  },

  date: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: 2,
  },

  status: {
    fontSize: "12px",
    marginTop: 4,
  },
};
  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} style={styles.stepWrapper}>
            {/* LEFT SIDE (Circle + Line) */}
            <div style={styles.left}>
              
              {/* Circle */}
              <div
                style={{
                  ...styles.circle,
                  background: isCompleted
                    ? "#16a34a"
                    : isActive
                    ? "#000"
                    : "#d1d5db",
                }}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div style={styles.lineContainer}>
                  
                  {/* Base line */}
                  <div style={styles.lineBase} />

                  {/* Animated progress line */}
                  <div
                    style={{
                      ...styles.lineProgress,
                      height: isCompleted ? "100%" : isActive ? "50%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>

            {/* RIGHT SIDE (Content) */}
            <div style={styles.content}>
              <div style={styles.title}>{step.title}</div>
              {step.date && <div style={styles.date}>{step.date}</div>}
              <div
                style={{
                  ...styles.status,
                  color: isCompleted
                    ? "#16a34a"
                    : isActive
                    ? "#000"
                    : "#9ca3af",
                }}
              >
                {isCompleted
                  ? "Completed"
                  : isActive
                  ? "In Progress"
                  : "Pending"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStepper;