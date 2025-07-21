#!/bin/bash

# Quick webhook server status check
echo "🔍 Webhook Server Status"
echo "======================="

# Check if server is running
if pgrep -f "node server.cjs" > /dev/null; then
    PID=$(pgrep -f "node server.cjs")
    echo "✅ Server is running (PID: $PID)"
    
    # Check port
    if lsof -i :8080 > /dev/null 2>&1; then
        echo "✅ Port 8080 is active"
        
        # Check health
        HEALTH=$(curl -s http://localhost:8080/webhook/status | jq -r '.status' 2>/dev/null)
        if [ "$HEALTH" = "healthy" ]; then
            echo "✅ Health: healthy"
        elif [ "$HEALTH" = "degraded" ]; then
            echo "⚠️  Health: degraded"
        else
            echo "❌ Health: unknown"
        fi
        
        # Show stats
        STATS=$(curl -s http://localhost:8080/webhook/stats 2>/dev/null)
        if [ $? -eq 0 ]; then
            TOTAL=$(echo "$STATS" | jq -r '.totalRequests')
            SUCCESS=$(echo "$STATS" | jq -r '.successRate')
            echo "📊 Requests: $TOTAL (${SUCCESS}% success)"
        fi
        
        echo ""
        echo "🌐 Webhook URL: http://localhost:8080/webhook/visualization-data"
        echo "📋 Status URL: http://localhost:8080/webhook/status"
        
    else
        echo "❌ Port 8080 is not active"
    fi
else
    echo "❌ Server is not running"
    echo "💡 Start with: node server.cjs"
fi