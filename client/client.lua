-- Notification Types: success, error, info, warning
-- Emergency Types: police, fire, ems

local function SendNotification(type, title, message)
    SendNUIMessage({
        type = "notification",
        notificationType = type,
        title = title,
        message = message
    })
end

local function SendEmergencyAlert(type, code, location, description)
    SendNUIMessage({
        type = "emergency",
        alertType = type,
        code = code,
        location = location,
        description = description
    })
end

-- Register callback for emergency responses
RegisterNUICallback('emergencyResponse', function(data, cb)
    -- Handle the emergency response here
    -- You can trigger events or run other logic when an officer responds
    TriggerEvent('frmp-notifications:emergencyResponse', data.id)
    cb('ok')
end)

-- Export functions for other resources to use
exports('SendNotification', SendNotification)
exports('SendEmergencyAlert', SendEmergencyAlert)

-- Event handlers for C# integration
RegisterNetEvent('frmp-notifications:sendNotification')
AddEventHandler('frmp-notifications:sendNotification', function(type, title, message)
    SendNotification(type, title, message)
end)

RegisterNetEvent('frmp-notifications:sendEmergencyAlert')
AddEventHandler('frmp-notifications:sendEmergencyAlert', function(type, code, location, description)
    SendEmergencyAlert(type, code, location, description)
end)

-- Example commands for testing
RegisterCommand('testnotif', function(source, args, raw)
    local types = {'success', 'error', 'info', 'warning'}
    local type = args[1] or types[math.random(#types)]
    
    SendNotification(
        type,
        'Test Notification',
        'This is a test notification message with type: ' .. type
    )
end)

RegisterCommand('testalert', function(source, args, raw)
    local types = {'police', 'fire', 'ems'}
    local type = args[1] or types[math.random(#types)]
    local codes = {
        police = {'10-31', '10-71', '10-80'},
        fire = {'CODE 2', 'CODE 3', 'STRUCTURE FIRE'},
        ems = {'CODE BLUE', 'TRAUMA ALERT', 'MEDICAL EMERGENCY'}
    }
    
    SendEmergencyAlert(
        type,
        codes[type][math.random(#codes[type])],
        'Downtown Los Santos',
        'Emergency situation requiring immediate response'
    )
end)