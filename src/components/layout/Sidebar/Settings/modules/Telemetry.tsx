import type React from 'react';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Checkbox } from '@components/generic/form/Checkbox';
import { Form } from '@components/generic/form/Form';
import { Input } from '@components/generic/form/Input';
import { Select } from '@components/generic/form/Select';
import { connection } from '@core/connection';
import { useAppSelector } from '@hooks/useAppSelector';
import { Protobuf } from '@meshtastic/meshtasticjs';

export const Telemetry = (): JSX.Element => {
  const preferences = useAppSelector(
    (state) => state.meshtastic.radio.preferences,
  );
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset, control } =
    useForm<Protobuf.RadioConfig_UserPreferences>({
      defaultValues: preferences,
    });

  useEffect(() => {
    reset(preferences);
  }, [reset, preferences]);

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    void connection.setPreferences(data, async () => {
      reset({ ...data });
      setLoading(false);
      await Promise.resolve();
    });
  });
  return (
    <Form loading={loading} dirty={!formState.isDirty} submit={onSubmit}>
      <Checkbox
        label="Measurement Enabled"
        {...register('telemetryModuleEnvironmentMeasurementEnabled')}
      />
      <Checkbox
        label="Displayed on Screen"
        {...register('telemetryModuleEnvironmentScreenEnabled')}
      />
      <Input
        label="Read Error Count Threshold"
        type="number"
        {...register('telemetryModuleEnvironmentReadErrorCountThreshold', {
          valueAsNumber: true,
        })}
      />
      <Input
        label="Update Interval"
        suffix="Seconds"
        type="number"
        {...register('telemetryModuleEnvironmentUpdateInterval', {
          valueAsNumber: true,
        })}
      />
      <Input
        label="Recovery Interval"
        suffix="Seconds"
        type="number"
        {...register('telemetryModuleEnvironmentRecoveryInterval', {
          valueAsNumber: true,
        })}
      />
      <Checkbox
        label="Display Farenheit"
        {...register('telemetryModuleEnvironmentDisplayFahrenheit')}
      />
      <Select
        label="Sensor Type"
        optionsEnum={Protobuf.RadioConfig_UserPreferences_TelemetrySensorType}
        {...register('telemetryModuleEnvironmentSensorType', {
          valueAsNumber: true,
        })}
      />
      <Input
        label="Sensor Pin"
        type="number"
        {...register('telemetryModuleEnvironmentSensorPin', {
          valueAsNumber: true,
        })}
      />
    </Form>
  );
};